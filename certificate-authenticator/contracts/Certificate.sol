pragma solidity ^0.5.9;

contract Certificate {
    
    address public owner;
    string public StudentName;
    string public ID;
    string public CourseName;
    string public status;
    uint public GraduateDate; 
    
    modifier onlyOwner() {
        require(msg.sender == owner);
         _;
    }
    
    constructor (address _owner, string memory _StudentName, string memory _ID, string memory _CourseName,
    string memory _status, uint _GraduateDate) public {
        owner = _owner;
        StudentName = _StudentName;
        ID = _ID;
        CourseName = _CourseName;
        status = _status;
        GraduateDate = _GraduateDate; 
    }
    
    // function getBalance() public view onlyOwner returns (uint) {
    //     return address(this).balance;
    // }
    
    // function getCertificateDetails() public view returns (
    //     address, string memory, string memory, string memory, string memory, uint) {
    //     return (
    //         owner,
    //         StudentName,
    //         ID,
    //         CourseName,
    //         status,
    //         GraduateDate
    //     );
    // }
    
}
    
    contract CertificateNotary {
    // TODO
    address public owner;
    address[] public registeredCertificates;
    event ContractCreated(address contractAddress);

    
    function createCertificate( string memory _StudentName, string memory _ID, string memory _CourseName,
    string memory _status, uint _GraduateDate) public {
        
        address newCertificate =   address(new Certificate(msg.sender, _StudentName, _ID,
        _CourseName, _status, _GraduateDate));
        
        emit ContractCreated(newCertificate);
        registeredCertificates.push(newCertificate);
    }
    
    function getDeployedCertificates() public view returns (address[] memory) {
        return registeredCertificates;
    }
}
