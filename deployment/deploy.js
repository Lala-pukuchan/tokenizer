async function main() {
    // Remixでは、web3プロバイダーが自動的に提供されます。
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 残高の確認
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());

    // Token42コントラクトのインスタンスを取得
    const Token42 = await ethers.getContractFactory("Token42");

    // コントラクトをデプロイ
    const token42 = await Token42.deploy();
    await token42.deployed();

    console.log("Token42 deployed to:", token42.address);
}

// エラーハンドリングを含むスクリプト実行
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
