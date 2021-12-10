// import * as React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Slide,
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// // import Dialog from '@mui/material/Dialog';
// // import DialogActions from '@mui/material/DialogActions';
// // import DialogContent from '@mui/material/DialogContent';
// // import DialogContentText from '@mui/material/DialogContentText';
// // import DialogTitle from '@mui/material/DialogTitle';
// // import Slide from '@mui/material/Slide';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide ref={ref} direction="up" {...props} />;
// });

// export default function AlertDialog() {
//   const [open, setOpen] = React.useState(false);
//   const dispatch = useDispatch();

//   // const handleClickOpen = () => {
//   //   setOpen(true);
//   // };
//   useEffect(() => {
//     dispatch(setOpen(true));
//   }, [dispatch]);
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* <Button variant="outlined" onClick={handleClickOpen}>
//         Slide in alert dialog
//       </Button> */}
//       <Dialog
//         keepMounted
//         TransitionComponent={Transition}
//         aria-describedby="alert-dialog-slide-description"
//         open={open}
//         onClose={handleClose}>
//         <DialogTitle>{'Alert Error!!'}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             Let Google help apps determine location. This means sending
//             anonymous location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ history }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={open}
        onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Alert Error!!!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {history}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
