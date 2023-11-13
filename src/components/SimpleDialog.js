import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import { useContext } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import { LanguageContext } from '../LanguageContext';


export default function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const { language, updateLanguage } = useContext(LanguageContext);
    const [table, setTable] = React.useState(language==="fr"?["Arabe","Français"]:["عربية","فرنسية"])
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        if(value==="Arabe"){
            setTable(["عربية","فرنسية"])
        }
        else if (value ==="عربية"){
            setTable(["عربية","فرنسية"])
        }
        else if(value==="Français"){
            setTable(["Arabe","Français"])
        }
        else if(value==="فرنسية"){
            setTable(["Arabe","Français"])
        }
        else {
            setTable(["Arabe","Français"])
        }
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{language==="fr" ? "- Langue du Site -" : "- لغة الموقع الالكتروني -"}</DialogTitle>
            <List sx={{ pt: 0 }}>
            <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <TranslateIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={language==="fr" ? "Choisir une Langue" : "اختر لغة"} />
                    </ListItemButton>
                </ListItem>
                {table.map((item) => (
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick(item)} key={item}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <img
  src={item===table[0]? "https://flagcdn.com/tn.svg":"https://flagcdn.com/fr.svg"}
  width="30"
  alt={item}/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
