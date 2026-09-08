import bcrypt from "bcryptjs";

async function generatePasswordHash() {
  const password = process.argv[2];

  if (!password) {
    throw new Error(
      "Informe a senha: npm run password:hash -- sua-senha",
    );
  }

  if (password.length < 8) {
    throw new Error("A senha deve possuir pelo menos 8 caracteres.");
  }

  const hash = await bcrypt.hash(password, 12);

  console.log("\nCopie o valor abaixo para ADMIN_PASSWORD_HASH:\n");
  console.log(hash);
}

generatePasswordHash().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});