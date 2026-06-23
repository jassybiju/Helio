export interface IRealTimeNotifier {
  emitToRoom(room: string, event: string, payload: unknown): Promise<void>;
}
