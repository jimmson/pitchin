export interface IArea {
  _id?: string;
  name: string;
  createdAt: Date;
  createdBy: string;
  status: IStatus;
  zelos: IZelos;
}

export interface IZelos {
  hasGroup: boolean;
  groupId?: number;
}

export interface IStatus {
  archived: boolean;
}
