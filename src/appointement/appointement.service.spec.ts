import { Test, TestingModule } from '@nestjs/testing';
import { AppointementService } from './appointement.service';

describe('AppointementService', () => {
  let service: AppointementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointementService],
    }).compile();

    service = module.get<AppointementService>(AppointementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
