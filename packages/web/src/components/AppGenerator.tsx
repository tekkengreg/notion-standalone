import React, { useState } from 'react';
import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';

interface AppGeneratorProps {
  onSubmit: (data: { name: string; url: string; icon?: string }) => void;
  isLoading?: boolean;
}

export const AppGenerator: React.FC<AppGeneratorProps> = ({ onSubmit, isLoading = false }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState<string | null>(null);

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, url, icon: icon || undefined });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Générer une application macOS
      </Typography>
      
      <TextField
        fullWidth
        label="Nom de l'application"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="URL à charger"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        margin="normal"
        required
        placeholder="https://example.com"
      />

      <Box sx={{ mt: 2, mb: 3 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-upload"
          type="file"
          onChange={handleIconChange}
        />
        <label htmlFor="icon-upload">
          <Button variant="outlined" component="span">
            {icon ? 'Changer l\'icône' : 'Ajouter une icône'}
          </Button>
        </label>
        {icon && (
          <Box sx={{ mt: 2 }}>
            <img src={icon} alt="Preview" style={{ maxWidth: 100, maxHeight: 100 }} />
          </Box>
        )}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading || !name || !url}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            Génération en cours...
          </>
        ) : (
          'Générer l\'application'
        )}
      </Button>
    </Box>
  );
}; 