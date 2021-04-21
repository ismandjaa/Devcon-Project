//just copy into app.js.

import React, {  useEffect }  from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StarBorder from '@material-ui/icons/StarBorder';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let [data, setData] = React.useState(0);
  let [day1, setDay1] = React.useState(0);
  let [day2, setDay2] = React.useState(0);
  let [day3, setDay3] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const getData = () => {
    axios.get('https://pretalx.com/api/events/democon/talks/')
    .then((response) => {
      data = response.data.results;
      setData(data)
      const day1 = []
      const day2 = []  
      const day3 = []
      
      var i;
        for (i = 0; i < data.length; i++) {
        if(data[i].slot.start.substr(8,2) === "17"){
            day1.push(data[i])
        }
        else if (data[i].slot.start.substr(8,2) === "18"){
            day2.push(data[i])
        } 
        else if (data[i].slot.start.substr(8,2) === "19"){
            day3.push(data[i])
        }}
        day1.sort((a, b) => (a.slot.start.substr(11,4) > b.slot.start.substr(11,4)) ? 1 : -1)
        day2.sort((a, b) => (a.slot.start.substr(11,4) > b.slot.start.substr(11,4)) ? 1 : -1)
        day3.sort((a, b) => (a.slot.start.substr(11,4) > b.slot.start.substr(11,4)) ? 1 : -1)
        setDay1(day1)
        setDay2(day2)
        setDay3(day3)
        console.log(day1)
        console.log(day2)
        console.log(day3)
    });
  }

  const handleRoomClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  useEffect(() => {
    getData();
  }, []);

  if(!day3) return (<span>loading...</span>);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Day One" {...a11yProps(0)} />
          <Tab label="Day Two" {...a11yProps(1)} />
          <Tab label="Day Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <div style={{ paddingBottom: '10px'}}>
            <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleRoomClick} color="primary" style={{ marginLeft: '90%'}} startIcon={<ArrowDropDownIcon />}>
              rooms
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Magenta Room</MenuItem>
            </Menu>
          </div>
          }
          className={classes.root}
        >
            {day1.map((day1_id) => { return <div><ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={day1_id.title} secondary= {day1_id.slot.start.substr(11,5)}/>
            <ListItemText style={{ textAlign: 'right', paddingRight: "50px"}} primary={"by " + day1_id.speakers[0].name} secondary= {day1_id.slot.room.en}/>
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem> 
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemText primary={day1_id.description} />
                </ListItem>
                </List>
            </Collapse>
          <Divider variant="inset" component="li" />
          </div>
            })}
        </List>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <div style={{ paddingBottom: '10px'}}>
            <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleRoomClick} color="primary" style={{ marginLeft: '90%'}} startIcon={<ArrowDropDownIcon />}>
              rooms
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Magenta Room</MenuItem>
            </Menu>
          </div>
          }
          className={classes.root}
        >
            {day2.map((day2_id) => { return <div><ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={day2_id.title} secondary= {day2_id.slot.start.substr(11,5)}/>
            <ListItemText style={{ textAlign: 'right', paddingRight: "50px"}} primary={"by " + day2_id.speakers[0].name} secondary= {day2_id.slot.room.en}/>
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem> 
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemText primary={day2_id.description} />
                </ListItem>
                </List>
            </Collapse>
          <Divider variant="inset" component="li" />
          </div>
            })}
        </List>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <div style={{ paddingBottom: '10px'}}>
            <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" onClick={handleRoomClick} color="primary" style={{ marginLeft: '90%'}} startIcon={<ArrowDropDownIcon />}>
              rooms
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Magenta Room</MenuItem>
            </Menu>
          </div>
          }
          className={classes.root}
        >
            {day3.map((day3_id) => { return <div><ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={day3_id.title} secondary= {day3_id.slot.start.substr(11,5)}/>
            <ListItemText style={{ textAlign: 'right', paddingRight: "50px"}} primary={"by " + day3_id.speakers[0].name} secondary= {day3_id.slot.room.en}/>
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem> 
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemText primary={day3_id.description} />
                </ListItem>
                </List>
            </Collapse>
          <Divider variant="inset" component="li" />
          </div>
            })}
        </List>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}