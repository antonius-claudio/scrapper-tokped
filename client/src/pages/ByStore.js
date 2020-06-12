import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CategoryIcon from '@material-ui/icons/Category';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DownloadIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/Send';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import xlsx from 'xlsx';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function ByStore() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [linkUrl, setLinkUrl] = React.useState('');
    const [result, setResult] = React.useState([]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
        //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //   credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    let getData = async () => {
        console.log(linkUrl)
        postData('http://localhost:3000/itembyStore', { linkUrl })
        .then(data => {
            setResult(data);
            console.log(data); // JSON data parsed by `response.json()` call
        });
    }

    const toExcel = () => {
      if (result) {
        let new_workbook = xlsx.utils.book_new();
        let worksheet = xlsx.utils.json_to_sheet(result);
        xlsx.utils.book_append_sheet(new_workbook, worksheet, 'Sheet1');
        xlsx.writeFile(new_workbook, `${Date.now()}.xlsx`);
      }
    }

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                Scrapper Tokopedia
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
                <Link to='/'>
                    <ListItem button>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText primary={'By Category'} />
                    </ListItem>
                </Link>
                <Link to='/store'>
                    <ListItem button>
                    <ListItemIcon><StorefrontIcon /></ListItemIcon>
                    <ListItemText primary={'By Store'} />
                    </ListItem>
                </Link>
            </List>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="link" label="Link by Store" variant="outlined" onChange={(e) => setLinkUrl(e.target.value)}/>
                {result.length === 0 &&
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon />}
                    onClick={getData}
                >
                    Send
                </Button>
                }
                {result && result.length !== 0 && 
                  <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<DownloadIcon />}
                      onClick={toExcel}
                  >
                      Download
                  </Button>
                }
            </form>
            <div>
            {result && result.length !== 0 && 
            <Table>
                <Thead style={{backgroundColor:'#9e87fb', color:'#fff'}}>
                    <Tr>
                        <Th style={{padding: '5px'}}>Title</Th>
                        <Th style={{padding: '5px'}}>Price</Th>
                        <Th style={{padding: '5px'}}>Weight</Th>
                        <Th style={{padding: '5px'}}>Etalase</Th>
                        <Th style={{padding: '5px'}}>Description</Th>
                        <Th style={{padding: '5px'}}>Image1</Th>
                        <Th style={{padding: '5px'}}>Image2</Th>
                        <Th style={{padding: '5px'}}>Image3</Th>
                        <Th style={{padding: '5px'}}>Image4</Th>
                        <Th style={{padding: '5px'}}>Image5</Th>
                    </Tr>
                </Thead>
                <Tbody  style={{backgroundColor:'#fddbdb'}}>
                    {result.map(i => (
                        <Tr>
                            <Td>{i.title}</Td>
                            <Td>{i.price}</Td>
                            <Td>{i.weight}</Td>
                            <Td>{i.etalase}</Td>
                            <Td>{i.description}</Td>
                            <Td>{i.image1 ? i.image1 : 'none'}</Td>
                            <Td>{i.image2 ? i.image2 : 'none'}</Td>
                            <Td>{i.image3 ? i.image3 : 'none'}</Td>
                            <Td>{i.image4 ? i.image4 : 'none'}</Td>
                            <Td>{i.image5 ? i.image5 : 'none'}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            }
            </div>
        </main>
        </div>
    );
};