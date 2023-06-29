// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract EnigmaPaste {
    struct Paste {
        uint256 id;
        string title;
        string language;
        string aurthor;
        uint256 creationTime;
        string ipfsCid;
        bool isPrivate;
    }

    mapping(address => mapping(uint256 => Paste)) ownerToPastes; // Mapping to store pastes of each owner
    mapping(address => uint256) ownerToPasteCount; // Mapping to track the number of pastes for each owner
    mapping(address => uint256) ownerToMaxPasteCount; // Mapping to store the maximum paste ID for each owner

    event PasteCreated(address owner, uint256 pasteId);
    event PasteDeleted(address owner, uint256 pasteId);

    modifier validPasteId(address _owner, uint256 _pasteId) {
        require(ownerToPastes[_owner][_pasteId].id > 0, "Invalid paste ID");
        _;
    }

    /*
    This function creates a new paste and stores it in the `ownerToPastes` mapping.
    It generates a unique paste ID for the owner, increments the paste count, 
    and emits a `PasteCreated` event.
    */
    function createPaste(
        string memory _title,
        string memory _language,
        string memory _aurthor,
        uint256 _creationTime,
        string memory _ipfsCid,
        bool _isPrivate
        ) public {
        uint256 pasteId = ownerToMaxPasteCount[msg.sender]+1;
        ownerToPastes[msg.sender][pasteId] = Paste(pasteId, _title, _language, _aurthor, _creationTime, _ipfsCid, _isPrivate);
        emit PasteCreated(msg.sender, pasteId);
        ownerToPasteCount[msg.sender]++;
        ownerToMaxPasteCount[msg.sender] = pasteId;
    }

    function getPasteCount() public view returns (uint256) {
        return ownerToPasteCount[msg.sender];
    }

    function getPaste(uint256 _pasteId) public view validPasteId(msg.sender, _pasteId) returns (Paste memory) {
        return ownerToPastes[msg.sender][_pasteId];
    }

    function deletePaste(uint256 _pasteId) public validPasteId(msg.sender, _pasteId) {
        delete ownerToPastes[msg.sender][_pasteId];
        emit PasteDeleted(msg.sender, _pasteId);
        ownerToPasteCount[msg.sender]--;
    }

    // Internal function to return the minimum of two numbers
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a <= b ? a : b;
    }

    /*
    This function returns an array of all active pastes owned by the caller. 
    It retrieves pastes in descending order by iterating from the maximum paste ID 
    */
    function getAllPastes() public view returns (Paste[] memory){
        uint256 k = ownerToPasteCount[msg.sender];
        Paste[] memory activePastes = new Paste[](k);

        uint256 activePasteIndex = 0;
        for (uint256 i=ownerToMaxPasteCount[msg.sender]; (i > 0) && (activePasteIndex < k); i--){
            if(ownerToPastes[msg.sender][i].id > 0){
                activePastes[activePasteIndex++] = ownerToPastes[msg.sender][i];
            }
        }
        return activePastes;
    }

    /*
    This function returns an array of the most recent pastes owned by the caller,
     up to a specified limit `k`.
    */
    function getRecentPastes(uint256 k) public view returns (Paste[] memory){
        k = min(k, ownerToPasteCount[msg.sender]);
        Paste[] memory activePastes = new Paste[](k);

        uint256 activePasteIndex = 0;
        for (uint256 i=ownerToMaxPasteCount[msg.sender]; (i > 0) && (activePasteIndex < k); i--){
            if(ownerToPastes[msg.sender][i].id > 0){
                activePastes[activePasteIndex++] = ownerToPastes[msg.sender][i];
            }
        }
        return activePastes;
    }
}