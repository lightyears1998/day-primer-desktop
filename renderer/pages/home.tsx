import { remote, shell } from "electron";
import React, { useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

import Link from "../components/Link";

const useStyles = makeStyles(() =>
  createStyles({ root: { textAlign: "center" } })
);

const Home = (): JSX.Element => {
  const classes = useStyles({});

  const [open, setOpen] = React.useState(false);
  const [documentPath, setDocumentPath] = React.useState("");

  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setOpen(true);
    documentPath && shell.openPath(documentPath);
  };

  useEffect(() => {
    const app = remote.app;
    setDocumentPath(app.getPath("documents"));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <div className={classes.root}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>{documentPath}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          with Nextron
        </Typography>
        <img src="/images/logo.png" />
        <Typography gutterBottom>
          <Link href="/next">Go to the next page</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          打开数据文件夹
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
