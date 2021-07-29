
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    },
}));
const ToDoList = () => {
    const [toDoData, setToDoData] = useState([]);
    const [textData, setTextData] = useState();
    const [editArrayIndex, setEditArrayIndex] = useState();
    const [editText, setEditText] = useState();
    const classes = useStyles();
    const handleSubmit = () => {
        if (textData != null) {
            setToDoData([...toDoData, textData])
            setTextData('');
            localStorage.setItem('items', JSON.stringify([...toDoData, textData]))
        }
        else {
            alert('Please Enter Data')
        }
    }
    const handleKeypress = e => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    useEffect(() => {
        console.log(localStorage.getItem('items'))
        if (localStorage.getItem('items') != undefined)
            setToDoData(JSON.parse(localStorage.getItem('items')))
    }, [])
    const handleDelete = (index) => {
        let toDoList = [...toDoData];
        toDoList.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(toDoList))
        setToDoData(toDoList);
    }
    const handleEditKeyPress = (e) => {
        if (e.key === "Enter") {
            let data = [...toDoData];
            data[editArrayIndex] = editText;
            localStorage.setItem('items', JSON.stringify(data))
            setToDoData(data);
            setEditArrayIndex('');
        }
    }
    return (
        <div className="App">
            <h1>TO DO LIST</h1>
            <h3>Please Enter to save edited data</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '400px', overflowY: 'scroll' }}>
                {toDoData?.map((item, index) => {
                    return (
                        <div style={{ margin: '1%', width: '150px', display: 'flex', borderRadius: '10px' }}>
                            {editArrayIndex === index ?
                                <TextField id="standard-basic" label="Edit data" value={editText} onChange={(e) => setEditText(e.target.value)} onKeyPress={handleEditKeyPress} />
                                :
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <IconButton >
                                            <EditIcon onClick={() => {
                                                setEditArrayIndex(index);
                                                setEditText(item)

                                            }} />
                                        </IconButton>


                                        <Chip label={item} onDelete={() => handleDelete(index)} color="primary" onEdit={() => console.log('hi')} />
                                    </div>
                                </>
                            }
                        </div>
                    )
                })}
            </div>
            <div>
                <TextField id="standard-basic" label="Enter To Do Data" value={textData} onChange={(e) => setTextData(e.target.value)} onKeyPress={handleKeypress} />
                <Button variant="contained" color="primary" style={{ textTransform: 'none' }} onClick={handleSubmit}>
                    Add Data
                </Button>
            </div>

        </div>
    );
}

export default ToDoList;