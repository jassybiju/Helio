export class ExpiryAppointmentsUseCase {
    _logger;
    _appointementRepo;
    constructor(_logger, _appointementRepo) {
        this._logger = _logger;
        this._appointementRepo = _appointementRepo;
    }
    async execute() {
        this._logger.info("Expiry Appointemnt Handling");
        await this._appointementRepo.expirePendingAppointments();
        this._logger.info("Expiry Appointemnt Handled");
    }
}
//# sourceMappingURL=ExpiryAppointmentsUseCase.js.map