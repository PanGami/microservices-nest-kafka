export async function Log( logModel: any, orderId: string, step: string, message: string): Promise<void> {
  try {
    await logModel.create({ orderId, step, message, timestamp: new Date() });
  } catch (err) {
    console.error('Logging failed:', err.message || err);
  }
}