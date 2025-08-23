import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as auth_idl } from '../declarations/auth';
import type { _SERVICE } from '../types/auth';

const auth_id = "ucwa4-rx777-77774-qaada-cai";

export function getAuthActor() {
  const agent = new HttpAgent({ host: 'http://192.168.0.103:4943' });
  return Actor.createActor<_SERVICE>(auth_idl, {
    agent,
    canisterId: auth_id,
  });
}
