import { Module } from '@nestjs/common';
import { SigfoxService } from './sigfox.service';

@Module({
  providers: [SigfoxService]
})
export class SigfoxModule {}
