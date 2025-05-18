# rideshare-app
Decentralised ride sharing app using Blockchain Technology

Sure! Here's a paraphrased version of your content that keeps the meaning intact while improving flow, grammar, and clarity:

---

## Inspiration

PeerPool draws inspiration from major ride-sharing platforms like Uber and Lyft, which have centralized the relationship between drivers and passengers—often at a steep cost. These companies take up to 25% of a driver’s earnings, while also preventing direct communication between users and service providers. Our vision was to eliminate this middleman and create an advanced, feature-rich alternative that decentralizes the entire ride-sharing experience. PeerPool solves this by removing intermediaries, using decentralized data storage so only users control their information. It’s a trustless, decentralized solution to carpooling—addressing the gaps left by traditional corporate players.

## What it does

PeerPool is a decentralized application (DApp) that replicates and enhances the ride-sharing model, without the need for a centralized authority. Through trustless smart contracts, it acts as an automated peer-to-peer intermediary. This reduces transaction fees to virtually zero, while maintaining secure and efficient dispute resolution. PeerPool removes legal and financial burdens from gig workers by shifting liability to smart contracts, making the ride-sharing process fairer and more transparent.

## How we built it

We developed PeerPool using a stack that includes IPFS, the Ethereum ecosystem, ReactJS, Express, and Material UI. User data is securely stored on IPFS, ensuring decentralization and data privacy through content-addressable storage. Smart contracts written in Solidity and deployed on Ethereum handle user interactions and ride logic. The frontend is built with ReactJS and styled using Material UI for a responsive, user-friendly experience. We used the Google Maps API to calculate and display routes, integrating it via a Higher-Order Component. The Web Geolocation API determines the user’s current location, and we use that along with their destination input to map optimized routes. On the backend, we built a modular Express server with multiple routers that handle calls to both IPFS and smart contract functions.

## Challenges we ran into

One of our toughest challenges was debugging the Smart Contract backend. Solidity, with its limited and often vague documentation, forced us to innovate and experiment with custom implementations. Error messages from the Node environment and EVM were also cryptic, complicating our debugging efforts. Coordinating the full-stack infrastructure—smart contracts, Express routes, IPFS integration, frontend components, and map rendering—was a complex task. It demanded intense focus to ensure all parts worked seamlessly together. We encourage checking out the GitHub repo, especially `Main.sol` and the `routes` folder, to see the sheer scope and detail of the implementation.
