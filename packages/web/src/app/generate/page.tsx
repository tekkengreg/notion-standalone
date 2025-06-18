'use client';

import React from 'react';
import { Container, Alert } from '@mui/material';
import { AppGenerator } from '../../components/AppGenerator';
import { useAppGenerator } from '../../hooks/useAppGenerator';

export default function GeneratePage() {
  const { generateApp, isLoading, error } = useAppGenerator();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <AppGenerator
        onSubmit={generateApp}
        isLoading={isLoading}
      />
    </Container>
  );
} 