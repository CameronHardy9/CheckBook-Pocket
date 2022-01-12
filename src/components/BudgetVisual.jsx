import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function BudgetVisual(props) {
  return (
    <div className="visualContainer" style={{display: "flex", width: "100%", height: "75%", alignItems: "center", justifyContent: "center"}}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress size={300} variant="determinate" value={props.value} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" sx={{fontSize: "100px"}} component="div" color="text.secondary">
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
    </div>
  );
};
