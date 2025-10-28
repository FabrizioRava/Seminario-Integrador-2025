import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  it('should delegate to super.canActivate', () => {
    const guard = new JwtAuthGuard();
    const context = { switchToHttp: jest.fn() } as unknown as ExecutionContext;
    // Spy on parent prototype method
    const spy = jest.spyOn(Object.getPrototypeOf(guard), 'canActivate').mockReturnValue(true as any);
    const res = guard.canActivate(context);
    expect(res).toBe(true);
    expect(spy).toHaveBeenCalledWith(context);
  });
});