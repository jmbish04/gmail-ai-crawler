import { AiClassificationResult } from './ai';

export function routeEmailClassification(class: AiClassificationResult) {
  switch (class.actionType) {
    case 'actionable':
      // Integrate with GitHub or PMO
      console.log('Routing to task management');
      break;

    case 'finance':
      // Push to data ledger, check vs. contract
      console.log('Routing to financial record');
      break;

    case 'info':
      // Low priority, maybe notify only
      console.log('No-action routing');
      break;

    default:
      console.warn('Unknown classification type', class.actionType);
      break;
  }
}
