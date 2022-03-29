import classes from "./MainLayout.module.css";
function MainLayout(props){
    return (
        <>
        <h2 className={classes.center}>Admin UI</h2>
        {props.children}       
        </>
    )
}
export default MainLayout;