export class Gpio {
  id: number;
  description: string;
}
export class SwitchConfig {
  server: string;
  port: number;
  service: string;
  gpios: Gpio[];
}
