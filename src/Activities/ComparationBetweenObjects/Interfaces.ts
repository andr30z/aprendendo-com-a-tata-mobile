export interface Bond {
  receiverId: string;
  senderId: string;
}

export interface ArrayBonds extends Array<Bond> {}
