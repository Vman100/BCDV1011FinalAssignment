pragma solidity ^0.4.19;

contract CertificateNotary {
    // TODO
    address [] public registeredCertificates;
    event ContractCreated(address contractAddress);
    
    function createCertificate(string _StudentName, string _ID, string _CourseName,
    string _status, uint _GraduateDate) public {
        
        address newCertificate = new Certificate(msg.sender, _StudentName, _ID,
        _CourseName, _status, _GraduateDate);
        
        // saving the address so a front-end client can find it
        
        // emit ContractCreated(newCertificate);
        
        registeredCertificates.push(newCertificate);
    }
    function getDeployedCertificates() public view returns (address[]) {
        return registeredCertificates;
    }
}





contract Certificate {
    address public owner;
    string public StudentName;
    string public ID;
    string public CourseName;
    string public status;
    uint public GraduateDate; 
    
    constructor (address _owner, string _StudentName, string _ID, string _CourseName,
    string _status, uint _GraduateDate) public {
        // You will instantiate your contract here
        owner = _owner;
        StudentName = _StudentName;
        ID = _ID;
        CourseName = _CourseName;
        status = _status;
        GraduateDate = _GraduateDate; 
    }
    modifier onlyOwner() {
        require(msg.sender == owner);
         _;
    }
    
// To use a modifier, append it to the end of the function name
    function collect() external onlyOwner {
        owner.transfer(address(this).balance);
    }
    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }
    function getCertificateDetails() public view returns (
        address, string, string, string, string, uint) {
        return (
            owner,
            StudentName,
            ID,
            CourseName,
            status,
            GraduateDate
        );
    }
}