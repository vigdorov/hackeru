import React from 'react';

export const FamilyContext = React.createContext({}),
  FamilyProvider = FamilyContext.Provider,
  FamilyConsumer = FamilyContext.Consumer;