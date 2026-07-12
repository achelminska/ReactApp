// Musi odpowiadać polityce haseł ASP.NET Identity w Program.cs
export const PASSWORD_RULES = [
    { id: 'len', labelKey: 'auth.ruleLength', test: p => p.length >= 8 },
    { id: 'upper', labelKey: 'auth.ruleUpper', test: p => /[A-Z]/.test(p) },
    { id: 'lower', labelKey: 'auth.ruleLower', test: p => /[a-z]/.test(p) },
    { id: 'digit', labelKey: 'auth.ruleDigit', test: p => /\d/.test(p) },
];
