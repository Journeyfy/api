import { compare, hash } from "bcrypt";

export async function hashAsync(plainText: string, saltRounds: number = 10) {
  return await hash(plainText, saltRounds);
}

export async function compareHashAsync(plainText: string, hash: string) {
    return await compare(plainText, hash);
}
