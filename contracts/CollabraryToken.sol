//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract CollabraryToken is ERC721 {

    constructor() ERC721("CollabraryToken", "CLBT") {}

}