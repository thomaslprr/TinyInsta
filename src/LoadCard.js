import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";




export default function LoadPost() {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                title={

                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />

                }
                subheader={

                        <Skeleton animation="wave" height={10} width="40%" />

                }
            />

                <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />


            <CardContent>

                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
