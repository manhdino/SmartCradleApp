export interface Cradle {
  id: string;
  name: string;
  description: string;
  sku: string;
  ownerId: string;
  status: string;
  avatar: string;
  devices: CradleDevice[];
}

export interface CreateCradleDto {
  name: string;
  description?: string;
  sku: string;
  avatar?: string;
}

export enum CradleDeviceType {
  LEAN = 1,
  TEMPERATURE = 2,
  HUMIDITY = 3,
  NOISE = 4,
  FAN = 5,
  LIGHT = 6,
}

export interface CradleDevice {
  id: string;
  name: string;
  description: string;
  deviceType: CradleDeviceType;
  values: any[];
}

export interface ReceiveCradleData {
  cradleSku: string;
  cycle?: number;
  fan?: number;
  humidity?: number;
  light?: number;
  noise?: number;
  temperature?: number;
  time: string;
}
