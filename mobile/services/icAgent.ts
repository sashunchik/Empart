import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as auth_idl, canisterId as auth_id } from '../declarations/auth';

export function getAuthActor() {
  const agent = new HttpAgent({ host: 'http://127.0.0.1:4943/?canisterId=u6s2n-gx7777-77774-qaaaq-cai&id=uxrrr-q7777-77774-qaaaq-cai' }); // або локально http://127.0.0.1:4943
  return Actor.createActor(auth_idl, { agent, canisterId: auth_id });
}
