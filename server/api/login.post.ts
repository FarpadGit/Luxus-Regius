export default defineEventHandler(async (event) => {
  const { loginPassword } = useRuntimeConfig(event);
  const { password } = await readBody(event);
  const hashedPass = await generateHash(password);
  if (hashedPass === loginPassword) return true;

  return false;
});

async function generateHash(input: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
