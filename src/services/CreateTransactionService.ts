import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    
    if(!['income', 'outcome'].includes(type)){
      throw Error('Type does not be different income outcome')
    }

    const totalBalance = this.transactionsRepository.getBalance();
    if(type === 'outcome' && value > totalBalance.total) {
      throw Error('You don1t have money! ');
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;

  }
}

export default CreateTransactionService;
