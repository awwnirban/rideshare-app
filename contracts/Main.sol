pragma solidity >=0.4.21 <0.7.0;

contract Main {
    
    string storedData;

    function set(string memory x) public {
        storedData = x;
    }

    function get() public view returns (string memory) {
        return storedData;
    }

    function receive () external payable {

    }

    struct eligibleDrivers {
        address[] drivers;
        uint256 amount;
        address payable finalDriver;
        bool userConfirmation;
        bool driverConfirmation;
    }

    mapping(address => eligibleDrivers) driverTable; 
    address payable[] driverTableAddresses;

    function clearDrivers(address _address) private {
        delete driverTable[_address].drivers;
    }

    function finalizeDriver(address payable _driver, address _user) public {
        driverTable[_user].finalDriver = _driver;
        clearDrivers(_user);
    }

    bool temp;

    function addEligibleDriver(address payable _address, address payable _driver) public {
        temp = true;
        driverTable[_address].drivers.push(_driver);
        driverTable[_address].userConfirmation = false;
        driverTable[_address].driverConfirmation = false;
        
        for (uint256 j = 0; j < driverTableAddresses.length; j++) {
            if (driverTableAddresses[j] == _address) {
                temp = false;
                break;
            }
        }
        
        if (temp) {
            driverTableAddresses.push(_address);
        }
    }

    function returnDriverArray(address _user) public view returns (address[] memory) {
        return driverTable[_user].drivers;
    }

    bool breaker;
    address payable tempAddress;

    function stageDriverStatus(address payable _driver) public {
        breaker = true;
        
        for (uint256 i = 0; i < driverTableAddresses.length; i++) {
            if (!breaker) {
                break;
            }
            for (uint256 j = 0; j < driverTable[driverTableAddresses[i]].drivers.length; j++) {
                if (driverTable[driverTableAddresses[i]].drivers[j] == _driver) {
                    tempAddress = driverTableAddresses[i];
                    breaker = false;
                    break;
                }
            }
        }
    }

    function returnDriverStatus() public view returns (address payable) {
        if (!breaker) {
            return tempAddress;
        }
    }

    function clearDriverStatus() public {
        breaker = true;
        tempAddress = address(0);
    }

    function setUserConfirmation(address _user) public {
        require(driverTable[_user].finalDriver != address(0), "Final driver not set");
        driverTable[_user].userConfirmation = true;
    }

    function setCost(address _user, uint256 _amount) public {
        require(driverTable[_user].amount == 0, "Amount already set");
        driverTable[_user].amount = _amount;
    }

    function setDriverConfimation(address _user) public {
        require(driverTable[_user].finalDriver != address(0), "Final driver not set");
        driverTable[_user].driverConfirmation = true;
    }

    function finalizeTrip(address _user) public payable {
        require(driverTable[_user].userConfirmation, "User confirmation is required");
        require(driverTable[_user].driverConfirmation, "Driver confirmation is required");
        require(address(this).balance >= driverTable[_user].amount, "Insufficient balance in contract");

        driverTable[_user].finalDriver.transfer(driverTable[_user].amount);
        driverTable[_user].userConfirmation = false;
        driverTable[_user].driverConfirmation = false;
        driverTable[_user].finalDriver = address(0);
        driverTable[_user].amount = 0;
    }
}
