import type { IDoctorBlockShiftRepository } from "@application/ports/repositories/IDoctorBlockShiftRepository.ts";
import type { IIDGenerator } from "@application/ports/services/IIDGenerator.ts";
import type { ILogger } from "@application/ports/services/ILogger.ts";
import type {
  IBlockDoctorInput,
  IBlockDoctorSlotUseCase,
} from "@application/ports/use-cases/doctor/slot/IBlockDoctorSlotUseCase.ts";
import { DoctorBlockShift } from "@domain/entities/DoctorBlockShift.ts";
import { AppError } from "@shared/errors/AppError.ts";
import { HTTPStatus } from "@shared/types/HTTPStatus.ts";

export class BlockDoctorSlotUseCase implements IBlockDoctorSlotUseCase {
  constructor(
    private readonly _logger: ILogger,
    private readonly _idGenerator: IIDGenerator,
    private readonly _blockShiftRepo: IDoctorBlockShiftRepository
  ) {}
  async execute(doctorId: string, input: IBlockDoctorInput): Promise<void> {
    this._logger.info("Block schedule attempt", input);

    const BLOCK_PREFIX = process.env.BLOCK_PREFIX!;
    const blockShift = new DoctorBlockShift(
      this._idGenerator.generate(BLOCK_PREFIX),
      doctorId,
      input.startTime,
      input.endTime,
      input.reason,
      new Date()
    );

    // check if current blocks overrides existing ones
    const existingBlocks = await this._blockShiftRepo.findByDate(
      doctorId,
      blockShift.startTime
    );

    if (!blockShift.isNotOverlapping(existingBlocks)) {
      throw new AppError(
        "Block at given time already exists",
        HTTPStatus.UNPROCESSBLE_ENTITY
      );
    }

    // save block
    await this._blockShiftRepo.create(blockShift);
  }
}
