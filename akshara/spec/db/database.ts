import type {
  AksharaBlockData,
  AksharaBlockKey,
  AksharaLogData,
  AksharaLogKey,
  AksharaObjectData,
  AksharaObjectKey,
  AksharaObjectPartialKey,
  AksharaReceiptData,
  AksharaReceiptKey,
  AksharaTransactionData,
  AksharaTransactionKey,
} from './object';

export abstract class AksharaDatabaseAbstract {
  abstract _get(key: AksharaObjectKey): Promise<AksharaObjectData | void>;
  abstract _getObjects(
    key: AksharaObjectPartialKey,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaObjectData[]>;
  abstract _put(data: Pick<AksharaObjectKey, 'type'> & AksharaObjectData): Promise<void>;
  // abstract _putMany(datas: (Pick<EthgateObjectKey, 'type'> & EthgateObjectData)[]): Promise<void>;
  abstract _delete(key: AksharaObjectKey): Promise<void>;
  abstract clear(): Promise<void>;

  async __get(key: AksharaObjectKey): Promise<AksharaObjectData | void> {
    try {
      return this._get(key);
    } catch (error) {
      console.log(key);
      console.error(error);
      throw error;
    }
  }
  async __put(data: Pick<AksharaObjectKey, 'type'> & AksharaObjectData): Promise<void> {
    try {
      return this._put(data);
    } catch (error) {
      console.log(data);
      console.error(error);
      throw error;
    }
  }

  getBlock(key: AksharaBlockKey): Promise<AksharaBlockData | void> {
    return this.__get({ type: 'Block', ...key }) as any;
  }
  getTransaction(key: AksharaTransactionKey): Promise<AksharaTransactionData | void> {
    return this.__get({ type: 'Transaction', ...key }) as any;
  }
  getReceipt(key: AksharaReceiptKey): Promise<AksharaReceiptData | void> {
    return this.__get({ type: 'Receipt', ...key }) as any;
  }
  getLog(key: AksharaLogKey): Promise<AksharaLogData | void> {
    return this.__get({ type: 'Log', ...key }) as any;
  }
  putBlock(data: AksharaBlockData): Promise<void> {
    return this.__put({ type: 'Block', ...data });
  }
  putTransaction(data: AksharaTransactionData): Promise<void> {
    return this.__put({ type: 'Transaction', ...data });
  }
  putReceipt(data: AksharaReceiptData): Promise<void> {
    return this.__put({ type: 'Receipt', ...data });
  }
  putLog(data: AksharaLogData): Promise<void> {
    return this.__put({ type: 'Log', ...data });
  }
  async putBlocks(datas: AksharaBlockData[]): Promise<void> {
    await Promise.all(datas.map((data) => this.putBlock(data)));
  }
  async putTransactions(datas: AksharaTransactionData[]): Promise<void> {
    await Promise.all(datas.map((data) => this.putTransaction(data)));
  }
  async putReceipts(datas: AksharaReceiptData[]): Promise<void> {
    await Promise.all(datas.map((data) => this.putReceipt(data)));
  }
  async putLogs(datas: AksharaLogData[]): Promise<void> {
    await Promise.all(datas.map((data) => this.putLog(data)));
  }

  getBlocks(
    key: Partial<AksharaBlockKey>,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaBlockData[]> {
    return this._getObjects({ type: 'Block', ...key }, timestamp, limit) as any;
  }
  getTransactions(
    key: Partial<AksharaTransactionKey>,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaTransactionData[]> {
    return this._getObjects({ type: 'Transaction', ...key }, timestamp, limit) as any;
  }
  getReceipts(
    key: Partial<AksharaReceiptKey>,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaReceiptData[]> {
    return this._getObjects({ type: 'Receipt', ...key }, timestamp, limit) as any;
  }
  getLogs(
    key: Partial<AksharaLogKey>,
    timestamp: number | null,
    limit: number,
  ): Promise<AksharaLogData[]> {
    return this._getObjects({ type: 'Log', ...key }, timestamp, limit) as any;
  }
}
