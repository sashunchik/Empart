import * as bip39 from 'bip39';
import * as ed25519 from '@noble/ed25519';

export async function generateMnemonic() {
  return bip39.generateMnemonic(128);
}

export async function mnemonicToSeed(mnemonic: string): Promise<Uint8Array> {
  return await bip39.mnemonicToSeed(mnemonic);
}

export async function getKeyPairFromSeed(mnemonic: string) {
  const seed = await mnemonicToSeed(mnemonic);
  const privKey = seed.slice(0, 32);
  const pubKey = await ed25519.getPublicKey(privKey);
  return { privKey, pubKey };
}

export async function sign(privKey: Uint8Array, message: Uint8Array) {
  return await ed25519.sign(message, privKey);
}
