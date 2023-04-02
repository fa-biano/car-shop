import AbstractExceptions from './AbstractExceptions';

class NotFound extends AbstractExceptions {
  private static status = 404;

  constructor(message?: string) {
    super(NotFound.status, message || 'NOT_FOUND');
  }
}

export default NotFound;