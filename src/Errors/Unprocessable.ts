import AbstractExceptions from './AbstractExceptions';

class Unprocessable extends AbstractExceptions {
  private static status = 422;

  constructor(message? : string) {
    super(Unprocessable.status, message || 'Unprocessable Entity');
  }
}

export default Unprocessable;