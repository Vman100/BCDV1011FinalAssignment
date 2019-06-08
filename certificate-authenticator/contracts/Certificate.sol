pragma solidity ^0.5.4;

contract CertificateNotary {
    address owner;
    address[] registeredCertificates;

    event ContractCreated(address contractAddress);

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not owner");
         _;
    }

    function createCertificate(address _StudentAddress, string memory _IssuerName, string memory _StudentName,
    string memory _ProgramName, string memory _CertificateType, bool _Honors, uint _GradutationDate) public onlyOwner {
        address newCertificate = address(new Certificate(_StudentAddress, msg.sender, _IssuerName,
        _StudentName, _ProgramName, _CertificateType, _Honors, _GradutationDate));
        emit ContractCreated(newCertificate);
        registeredCertificates.push(newCertificate);
    }

    function getRegisteredCertificates() public view returns (address[] memory) {
        return registeredCertificates;
    }
}


contract Certificate {
    address owner;
    string IssuerName;
    string StudentName;
    string ProgramName;
    string CertificateType;
    bool Honors;
    uint GradutationDate;

    mapping(address => bool) canVerify;

    event verifierAdded(address verifierAddress);

    modifier onlyVerifier(address _sender){
        require(canVerify[_sender], "caller cannot verify");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not owner");
         _;
    }

    constructor (address _owner, address _IssuerAddr, string memory _IssuerName, string memory _StudentName,
    string memory _ProgramName, string memory _CertificateType, bool _Honors, uint _GradutationDate) public {
        owner = _owner;
        IssuerName = _IssuerName;
        StudentName = _StudentName;
        ProgramName = _ProgramName;
        CertificateType = _CertificateType;
        Honors = _Honors;
        GradutationDate = _GradutationDate;
        canVerify[_owner] = true;
        canVerify[_IssuerAddr] = true;
    }

    function getCertificateDetails() public onlyVerifier(msg.sender) view
    returns (address, string memory, string memory, string memory, string memory, bool, uint) {
        return (owner, IssuerName, StudentName, ProgramName, CertificateType, Honors, GradutationDate);
    }

    function addVerifier(address _verifierAddress) public onlyOwner {
        canVerify[_verifierAddress] = true;
        emit verifierAdded(_verifierAddress);
    }
}

