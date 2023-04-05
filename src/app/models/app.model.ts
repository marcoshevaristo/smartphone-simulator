import { v4 as uuidv4 } from 'uuid';

export class App {
  id: string;
  name: string;
  version: string;
  contactInfo: string;

  constructor(name?: string, version?: string, contactInfo?: string) {
    this.name = name;
    this.version = version;
    this.contactInfo = contactInfo;
    this.id = uuidv4();
  }
}
