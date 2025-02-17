import { processorController } from './modules/processor.controller';

// Get the controller methods from the Alvamind instance
const controller = processorController;

// Export the process function directly from the controller
export const process = controller.process;

// Re-export types
export type { Config } from './types';

// Export the full controller if needed
export { processorController };
