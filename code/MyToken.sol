// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC-20標準のインターフェース
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token42 is ERC20, Ownable {
    // 初期供給量: 1,000,000トークン (小数点以下18桁)
    uint256 private constant INITIAL_SUPPLY = 1_000_000 * 10**18;

    constructor() ERC20("Token42", "TK42") Ownable(msg.sender) {
        // トークンの初期供給をコントラクトデプロイヤーに割り当てる
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // Mint機能: 所有者だけが新しいトークンを作成可能
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Burn機能: 所有者だけがトークンを焼却可能
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}
