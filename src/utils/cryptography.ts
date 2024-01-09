import { compare, hash } from "bcrypt";

export async function hashAsync(plainText: string, saltRounds: number = 10) {
  return await hash(plainText, saltRounds);
}

export async function compareHashesAsync(hash1: string, hash2: string) {
    return await compare(hash1, hash2);
}
