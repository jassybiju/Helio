export class AIChatBotUseCase {
    _logger;
    _idGenerator;
    _vectorStore;
    _aiAgentService;
    constructor(_logger, _idGenerator, _vectorStore, _aiAgentService) {
        this._logger = _logger;
        this._idGenerator = _idGenerator;
        this._vectorStore = _vectorStore;
        this._aiAgentService = _aiAgentService;
    }
    async execute(patientId, message, conversationId) {
        this._logger.info("AI Chat Bot UseCase ", {
            patientId,
            message,
            conversationId,
        });
        let id = conversationId;
        if (!id) {
            id = this._idGenerator.generate(process.env.AICONV_PREFIX);
        }
        const response = await this._aiAgentService.chat({
            conversationId: id,
            patientId,
            message,
        });
        return { conversationId: id, message: response };
    }
}
//# sourceMappingURL=AIChatBotUseCase.js.map