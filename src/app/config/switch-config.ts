export class Gpio {
  id: number;
  description: string;
  state: boolean;
}
export class SwitchConfig {
  server: string;
  port: number;
  service: string;
  gpios: Gpio[];
  physicals: number[];
}
