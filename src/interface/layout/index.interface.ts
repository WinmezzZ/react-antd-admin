/** user's device */
enum DeviceList {
  /** telephone */
  MOBILE = 'MOBILE',
  /** computer */
  DESKTOP = 'DESKTOP',
}

export type Device = keyof typeof DeviceList;
