import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  safeArea: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1
  }, 
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  permission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionText:{
    fontWeight: "bold",
  }
})