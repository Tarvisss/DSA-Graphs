class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph

  //becuase this takes an array, i need to loop through the array and add each vertex/node to my set of nodes (this.nodes)
  addVertices(vertexArray) {
    for(const vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex

  // This function accepts two nodes (vertices) and connects them in both directions.
// It adds the second node to the first node’s 'adjacent' set,
// and adds the first node to the second node’s 'adjacent' set.
// This allows both nodes to know they are connected in the graph.

  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // loop through and remove all references to this node in adjacent sets
    for (const node of this.nodes){
      node.adjacent.delete(vertex)
    }
    // then remove the node itself
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // 1. Initialize a stack with the starting node (LIFO structure for DFS)
    let toVisitStack = [start];
  
    // 2. Create a set to keep track of visited nodes
    let seen = new Set();
  
    // 3. Prepare an array to store the order of visited node values
    let results = [];
  
    // 4. Loop while there are nodes left to visit
    while (toVisitStack.length) {
      // 5. Pop the last node added to the stack (DFS dives deep)
      let currentNode = toVisitStack.pop();
  
      // 6. Check if this node has already been visited
      if (!seen.has(currentNode)) {
  
        // 7. Mark the current node as visited
        seen.add(currentNode);
  
        // 8. Add the node's value to the results list
        results.push(currentNode.value);
  
        // 9. Loop through all neighbors of the current node
        for (let neighbor of currentNode.adjacent) {
  
          // 10. If a neighbor hasn't been visited, add it to the stack
          if (!seen.has(neighbor)) {
            toVisitStack.push(neighbor);
          }
        }
      }
    }
  
    // 11. Return the list of visited node values after traversal is complete
    return results;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set();
    let results = [];

    while (toVisitQueue.length){
      let currentNode = toVisitQueue.shift();
      if(!seen.has(currentNode)){
        seen.add(currentNode);
        results.push(currentNode.value);

        for( let neighbor of currentNode.adjacent){
          if (!seen.has(neighbor)){
            toVisitQueue.push(neighbor);
          }
        }
      }
    }
    return results;
  }
}

module.exports = {Graph, Node}