import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function BudgetVisual(props) {
  return (
        <div className="visualContainer" style={{display: "flex", flexDirection: "column", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
            <Typography align="center" variant="h2" sx={{fontSize: "30", marginBottom: "50px"}} component="div" color="text.secondary">
                Remaining Budget
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={300} thickness={3} variant="determinate" value={props.value} />
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
