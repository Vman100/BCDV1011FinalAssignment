# Certificate Authenticator

The use case for the smart contracts is to resolve certificate authenticity issue.

The scoop of the contracts is providing the ability to verify the authenticity of academic certificates, where an institution is the creator of the certificates and the students have the ability to view the info regarding their respective certificates.

The current version contains a limited set of functions for demo purposes, this is not production ready.

## design patterns

----
There are two design patterns in use, the verification pattern and the contract factory pattern.

The verification pattern is used restrict the ability to create the child contracts and provide the student assigned the child contract control over who can view their info.

The factory pattern include a contract known as the certificateNotery, used for creating and registering certificate contracts, and the certificate contract which contains the certificate info of an individual student. The certificateNotery contract is owned by the institution that that deployed the certificateNotery contract.

## functions

---
There four public functions in total which are split between the certificateNotery contract and the certificate contract, two functions each.

### **certificateNotery**

The **createCertificate** function accepts seven arguments, an address, four strings, a boolean, and an uint. calling this function creates a new certificate contract with the supplied info plus the caller's address as the issuer address and saves the address of the newly created contract in a list of registered certificates. No return value is expected but a log containing the address of the new contract is emitted and only the owner can call this function.

The **getRegisteredCertificates** function accepts no arguments. calling this function will return a list of all registered certificates.

### **certificate**

The **getCertificateDetails** function accepts no arguments. calling this function will return the meta-data of the given certificate contract which include the details of the certificate along with the address of the owner. Only the addresses that have permission by the owner can call this function.


The **addVerifier** function accepts one argument, an address. calling this function will enable the supplied address to view the certificate info contained within a given certificate contract. Noe return value is expected but a log containing the address that can now view the info is emitted and only certificate owner can call this function.

## Links

---
Based on: https://github.com/nczhu/forevermore

Project repository: https://github.com/Vman100/BCDV1011FinalAssignment

---
Created by Vedran Tepavcevic and contributed by Gia Luong Ngo